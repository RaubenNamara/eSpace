/**
 * The eSpace team, shown on the landing page ("Meet the team"): the executive director first, in a
 * larger card, then the stakeholders.
 *
 * PLACEHOLDERS - replace each name, role and bio with the real person before going live. `photo`
 * is optional: put the picture in frontend/public/images/team/ and give its path, e.g.
 * '/images/team/jane.jpg'; without one, the person's initials are shown.
 */
export interface TeamMember {
  name: string
  role: string
  bio: string
  // 'lead' = the executive director (one person); 'stakeholder' = everyone else
  level: 'lead' | 'stakeholder'
  photo?: string
  placeholder?: boolean
}

export const team: TeamMember[] = [
  { name: 'Executive Director', role: 'Executive Director', level: 'lead', bio: 'Leads eSpace - where it goes next, the schools it works with, and the team that builds it. Works side by side with head teachers to make sure eSpace fits how their school really runs.', placeholder: true },
  { name: 'Developer one', role: 'Developer · Stakeholder', level: 'stakeholder', bio: 'Builds the platform - from the eNotes reader to the Learning Map and the marking tools.', placeholder: true },
  { name: 'Developer two', role: 'Developer · Stakeholder', level: 'stakeholder', bio: 'Builds and looks after eSpace - keeping it fast, safe and working on every phone.', placeholder: true },
  { name: 'Stakeholder', role: 'Stakeholder', level: 'stakeholder', bio: 'Helps shape eSpace and keeps it close to the schools that use it.', placeholder: true }
]

export const teamLead = team.find(m => m.level === 'lead')
export const teamStakeholders = team.filter(m => m.level === 'stakeholder')
