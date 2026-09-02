import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginCredentials, RegisterData, AuthPayload, AuthApiResponse } from '../types'
import { apiService } from '../services/api'

// Helper to normalize auth API responses
const getAuthPayload = (
  responseData: AuthApiResponse
): AuthPayload => ({
  user: responseData.data?.user ?? responseData.user,
  csrf_token:
    responseData.data?.csrf_token ?? responseData.csrf_token,
  token: responseData.data?.token ?? responseData.token,
  message:
    responseData.data?.message ?? responseData.message
})

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const activeRole = ref<string | null>(null) // For dual-role users (HOD + Teacher)
  const secondaryRole = ref<string | null>(null) // Secondary role if user has dual roles
  const teacherId = ref<number | null>(null) // For HODs who are also teachers

  // Computed
  const userRole = computed(() => activeRole.value || user.value?.role)
  const userId = computed(() => user.value?.id)
  const userName = computed(() => {
    // For students, use first_name from the students table if available
    console.log('userName computed:', user.value)
    if (user.value?.role === 'student' && (user.value as any).first_name) {
      console.log('Using first_name:', (user.value as any).first_name)
      return (user.value as any).first_name
    }
    console.log('Using username:', user.value?.username)
    return user.value?.username || 'User'
  })
  const userEmail = computed(() => user.value?.email)
  const hasDualRoles = computed(() => secondaryRole.value !== null)

  // Actions

  // Sets user/isAuthenticated/activeRole/secondaryRole/teacherId from a plain user object - shared
  // by login() and restoreFromStorage() so a page refresh re-derives the exact same dual-role
  // state (HOD assigned from an existing teacher account) that login() sets, instead of only
  // restoring `user`/`isAuthenticated` and silently losing the role-switcher.
  function applyUserData(userData: User) {
    user.value = userData
    isAuthenticated.value = true

    if (userData.role === 'hod' && (userData as any).teacher_id) {
      secondaryRole.value = 'teacher'
      teacherId.value = (userData as any).teacher_id
    } else {
      secondaryRole.value = null
      teacherId.value = null
    }

    // A dual-role user's chosen mode (switchRole()) is persisted separately from the canonical
    // backend role so a page refresh stays in whichever mode they were in instead of always
    // reverting to userData.role - only honor it if it's still a valid role for THIS user (e.g.
    // not a leftover from a previously logged-in different account).
    const storedActiveRole = localStorage.getItem('active_role')
    activeRole.value = (storedActiveRole === userData.role || storedActiveRole === secondaryRole.value)
      ? storedActiveRole
      : userData.role
  }

  // Restores auth state from localStorage on a fresh page load (e.g. after a hard refresh, before
  // any login() call has run in this session). Returns false if there was nothing to restore.
  function restoreFromStorage(): boolean {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) return false

    try {
      applyUserData(JSON.parse(storedUser))
      return true
    } catch (e) {
      localStorage.removeItem('user')
      return false
    }
  }

  async function login(credentials: LoginCredentials) {
    console.log('Login function called with credentials:', credentials)
    isLoading.value = true
    error.value = null

    try {
      console.log('Making API call to login endpoint...')
      const response = await apiService.login(credentials.identifier, credentials.password)
      
      console.log('API response received:', response)
      console.log('Response data:', response.data)
      console.log('Response structure:', JSON.stringify(response.data, null, 2))
      
      // Handle different response structures using helper
      const responseData = response.data as AuthApiResponse
      const payload = getAuthPayload(responseData)
      const message = payload.message || 'Login successful'
      const success = responseData.success
      
      console.log('Extracted user:', payload.user)
      console.log('User role:', payload.user?.role)
      
      if (success && payload.user) {
        console.log('Login - Raw user data from server:', payload.user)
        // Store only essential user fields to avoid circular references
        const plainUser = {
          id: payload.user.id,
          username: payload.user.username,
          email: payload.user.email,
          role: payload.user.role,
          profile_photo: payload.user.profile_photo,
          phone: payload.user.phone,
          is_active: payload.user.is_active,
          email_verified_at: payload.user.email_verified_at,
          teacher_id: payload.user.teacher_id, // For HODs who are also teachers
          must_change_password: payload.user.must_change_password // Teachers only
        }
        
        // Add student-specific fields if present
        if (payload.user.first_name) {
          (plainUser as any).first_name = payload.user.first_name
        }
        if (payload.user.last_name) {
          (plainUser as any).last_name = payload.user.last_name
        }
        if (payload.user.admission_number) {
          (plainUser as any).admission_number = payload.user.admission_number
        }
        
        console.log('Storing user data:', plainUser)
        applyUserData(plainUser)

        // Store tokens
        if (payload.csrf_token) {
          localStorage.setItem('csrf_token', payload.csrf_token)
        }
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(plainUser))
        
        console.log('Login successful, user stored:', plainUser)
        return { success: true, message: message, user: plainUser }
      } else {
        console.log('Login failed condition:', { success, user: payload.user, message })
        error.value = message || 'Login failed'
        return { success: false, message: error.value }
      }
    } catch (err: any) {
      console.error('Login error:', err)
      console.error('Error response:', err.response)
      console.error('Error message:', err.message)
      error.value = err.response?.data?.message || err.message || 'Login failed'
      return { success: false, message: error.value }
    } finally {
      isLoading.value = false
    }
  }

  async function register(data: RegisterData) {
    isLoading.value = true
    error.value = null

    try {
      const response = await apiService.register(data)
      const responseData = response.data as AuthApiResponse
      const payload = getAuthPayload(responseData)
      
      if (responseData.success && payload.user) {
        user.value = payload.user
        isAuthenticated.value = true
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(payload.user))
        
        return { success: true, message: payload.message || 'Registration successful' }
      } else {
        error.value = payload.message || 'Registration failed'
        return { success: false, message: error.value, errors: responseData.errors }
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Registration failed'
      return { success: false, message: error.value, errors: err.response?.data?.errors }
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    isLoading.value = true
    error.value = null

    try {
      await apiService.logout()
    } catch (err) {
      // Ignore logout errors
    } finally {
      // Clear state
      user.value = null
      isAuthenticated.value = false
      
      // Clear storage
      localStorage.removeItem('csrf_token')
      localStorage.removeItem('user')
      localStorage.removeItem('active_role')

      isLoading.value = false
    }
  }

  async function refresh() {
    try {
      const response = await apiService.refresh()
      const responseData = response.data as AuthApiResponse
      const payload = getAuthPayload(responseData)
      
      if (responseData.success && payload.user) {
        user.value = payload.user
        isAuthenticated.value = true
        
        if (payload.csrf_token) {
          localStorage.setItem('csrf_token', payload.csrf_token)
        }
        
        // Update localStorage with fresh user data
        localStorage.setItem('user', JSON.stringify(payload.user))
      }
    } catch (err) {
      // If refresh fails, logout
      await logout()
    }
  }

  async function loadUser() {
    const storedUser = localStorage.getItem('user')
    
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
        isAuthenticated.value = true
        
        // Verify session with server and refresh user data
        await refresh()
      } catch (err) {
        // Invalid stored user, clear it
        localStorage.removeItem('user')
        localStorage.removeItem('active_role')
        user.value = null
        isAuthenticated.value = false
      }
    }
  }

  async function updateProfile(data: any) {
    isLoading.value = true
    error.value = null

    try {
      const response = await apiService.updateProfile(data)
      const responseData = response.data as AuthApiResponse
      const payload = getAuthPayload(responseData)
      
      if (responseData.success && payload.user) {
        user.value = payload.user
        localStorage.setItem('user', JSON.stringify(payload.user))
        
        return { success: true, message: payload.message || 'Profile updated successfully' }
      } else {
        error.value = payload.message || 'Profile update failed'
        return { success: false, message: error.value }
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Profile update failed'
      return { success: false, message: error.value }
    } finally {
      isLoading.value = false
    }
  }

  async function changePassword(currentPassword: string, newPassword: string, newPasswordConfirmation?: string) {
    isLoading.value = true
    error.value = null

    try {
      const response = await apiService.changePassword(currentPassword, newPassword, newPasswordConfirmation)
      const responseData = response.data as AuthApiResponse
      const payload = getAuthPayload(responseData)

      if (responseData.success) {
        // Clear the flag locally (and in localStorage) so the router guard stops redirecting
        // to /teacher/change-password immediately, without needing a fresh login.
        if (user.value && (user.value as any).must_change_password) {
          const updatedUser = { ...user.value, must_change_password: false }
          user.value = updatedUser as User
          localStorage.setItem('user', JSON.stringify(updatedUser))
        }
        return { success: true, message: payload.message || 'Password changed successfully' }
      } else {
        error.value = payload.message || 'Password change failed'
        return { success: false, message: error.value }
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Password change failed'
      return { success: false, message: error.value }
    } finally {
      isLoading.value = false
    }
  }

  async function forgotPassword(email: string) {
    isLoading.value = true
    error.value = null

    try {
      const response = await apiService.forgotPassword(email)
      const responseData = response.data as AuthApiResponse
      const payload = getAuthPayload(responseData)
      
      if (responseData.success) {
        return { success: true, message: payload.message || 'Password reset link sent' }
      } else {
        error.value = payload.message || 'Failed to send reset link'
        return { success: false, message: error.value }
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to send reset link'
      return { success: false, message: error.value }
    } finally {
      isLoading.value = false
    }
  }

  async function resetPassword(token: string, newPassword: string) {
    isLoading.value = true
    error.value = null

    try {
      const response = await apiService.resetPassword(token, newPassword)
      const responseData = response.data as AuthApiResponse
      const payload = getAuthPayload(responseData)
      
      if (responseData.success) {
        return { success: true, message: payload.message || 'Password reset successfully' }
      } else {
        error.value = payload.message || 'Failed to reset password'
        return { success: false, message: error.value }
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to reset password'
      return { success: false, message: error.value }
    } finally {
      isLoading.value = false
    }
  }

  function hasRole(role: string | string[]): boolean {
    if (!user.value) return false

    const roles = Array.isArray(role) ? role : [role]
    if (roles.includes(user.value.role)) return true

    // Dual-role users (an HOD assigned from an existing teacher account) can access routes for
    // either of their two roles at any time - switchRole only changes which nav/dashboard is
    // shown by default, it isn't a hard permission gate (the backend works the same way: a
    // teacher_id linked in session always grants teacher access alongside the hod role).
    return secondaryRole.value !== null && roles.includes(secondaryRole.value)
  }

  function hasAnyRole(roles: string[]): boolean {
    return hasRole(roles)
  }

  function switchRole(role: string) {
    if (role === user.value?.role) {
      activeRole.value = user.value?.role
    } else if (role === secondaryRole.value) {
      activeRole.value = role
    } else {
      return
    }
    // Persisted so a page refresh stays in this mode instead of reverting to the canonical
    // backend role - see applyUserData().
    if (activeRole.value) localStorage.setItem('active_role', activeRole.value)
  }

  function getCurrentRole(): string {
    return activeRole.value || user.value?.role || ''
  }

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    activeRole,
    secondaryRole,
    teacherId,
    
    // Computed
    userRole,
    userId,
    userName,
    userEmail,
    hasDualRoles,
    
    // Actions
    restoreFromStorage,
    login,
    register,
    logout,
    refresh,
    loadUser,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    hasRole,
    hasAnyRole,
    switchRole,
    getCurrentRole
  }
})
