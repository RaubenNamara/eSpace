/**
 * The eSpace team, shown on the landing page ("Meet the team"): the executive director first, in a
 * larger card, then the rest of the team.
 *
 * `photo` is optional: put the picture in frontend/public/images/team/ and give its path, e.g.
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
  { name: 'Omuk. DG Daniel Ddamulira', role: 'Executive Director', level: 'lead', photo: '/images/team/daniel.webp', bio: 'Leads eSpace - where it goes next, the schools it works with, and the team that builds it. Works side by side with head teachers to make sure eSpace fits how their school really runs.' },
  { name: 'Ahwera Rabwon', role: 'Chief Product Officer', level: 'stakeholder', bio: 'Shapes what eSpace becomes - turning what teachers, students and schools need into the features they use every day.' },
  { name: 'Namara Rauben', role: 'Chief Technology Officer', level: 'stakeholder', bio: 'Leads the technology behind eSpace - how it is built, kept fast and secure, and ready for every school that joins.' },
  { name: 'Arinaitwe Bright', role: 'Senior Developer', level: 'stakeholder', photo: '/images/team/bright.webp', bio: 'Builds the platform - from the eNotes reader to the Learning Map and the marking tools.' }
]

export const teamLead = team.find(m => m.level === 'lead')
export const teamStakeholders = team.filter(m => m.level === 'stakeholder')
