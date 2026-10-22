import { ref } from 'vue'

/**
 * Lets a full-screen page (chat - see the fullScreenChat route meta) open the app's main menu,
 * which MainLayout keeps hidden on such pages. MainLayout watches this and slides the menu in.
 */
export const appSidebarRequests = ref(0)

export const openAppSidebar = () => {
  appSidebarRequests.value++
}
