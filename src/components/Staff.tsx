import React from 'react';
import classes from '../scss/Staff.module.scss';
import StaffGroup from './StaffGroup';

type StaffGroupData = {
  title: string,
  members: {
    name: String,
    content: String
  }[]
}

const staffData: Array<StaffGroupData> = [
  {
    title: 'Team',
    members: [
      {
        name: 'Bernhard von Puttkamer - founder (Germany/Hungary)',
        content: 'Bernhard von Puttkamer earned a master’s degree in environmental forestry from the University of Bangor, Wales in the UK, having previously completed his undergraduate studies at the University of Freiburg in Germany and the University of Sopron in Hungary. After his studies he acquired practical background in forestry work through training as a tree feller in Celerina, Switzerland. He has over 15 years of work experience managing and consulting forest enterprises in Central and Eastern Europe and sub-Sahara Africa. He worked as a senior consultant for green investment initiatives in Central and Eastern Europe and Africa and had built up sustainable forest investments for international companies and private owners in Romania, Estonia, Slovakia, Czech-Republic and Hungary. He has established a short rotation poplar plantation and an organic winery in Hungary.'
      },
      {
        name: 'Daniel Laszlo Balo - founder (Hungary)',
        content: 'After his graduation at the Royal Danish Academy (KADK), Daniel returned to his hometown Budapest to establish his own architectural studio working in architectural and interior design, public installations, sustainable planning and construction. Since 2015 Daniel is actively researching bamboo as a possible local, renewable construction material for the agricultural and architectural sector and manages a bamboo test plantation to monitor the resistance, hardiness, growth rate and structural properties of different species in continental climate. He co-founded “studio B”, a degree level course at Moholy-Nagy University of Art and Design Budapest (MOME), consisting of short and long term seminars, lectures, workshops and courses, loosely themed on the subject “spatial design” with the main focus on the relation between nature and humans. Prior to establishing his own practice, Daniel was a member of the Atelier of Pritzker winning architect Peter Zumthor (CH), joined the Pritzker winning studio of RCR Arquitectes in Spain and worked for the London based studio of John Pawson. Daniel’s realized projects are published worldwide: FRAME magazine, DETAIL, dezeen, designboom, DOMUS magazine, among many others.'
      }
    ]
  },
  {
    title: 'Local experts',
    members: [
      {
        name: 'Christopher Jankovich-Besan (South Africa-Hungary)',
        content: 'I am a self-starter, always willing to learn and not afraid to ask questions. Success drives me I and work well under pressure. I consider myself to have good people skills, whether dealing with management ensuring effective implementation of projects or managing teams of laborer’s. I’m a team player and believe in transparent cooperation. I have experience in the Farming and Timber industries. I am computer literate in Excel, Word and Outlook. I speak English, Afrikaans and Zulu.'
      },
      {
        name: 'Samuel Tezazu (Ethiopia)',
        content: 'Samuel is an Environmental Forester with a master’s degree in environmental science from Arba Minch University, Ethiopia. He studied his bachelor’s degree in Wood Science and Technology from Adama Science and Technology University; Also, he studied BSc degree in civil engineering from Arba Minch university. After his study, he acquired practical experience on wood processing in different local furniture company and different non-governmental institutions. He has more than 10 years of work experience. 7 years of teaching wood science and technology courses (Lecturer at Adama Science and Technology University) and more than 3 years of work experience at GIZ-Biodiversity and forestry programme as forest product processing advisor (timber and non-timber forest product technical advisor). Since January 01, 2021 he is working for GIZ-special initiative on training and job creation project as technical advisor on bamboo processing.'
      }
    ]
  }
]

function Staff() {
  const staffGroups = staffData.map( (item ) => {
    return <StaffGroup title={ item.title } members={ item.members }></StaffGroup>
  });

  return <div className={ classes.Staff }>
    { staffGroups }
  </div>
}

export default Staff;