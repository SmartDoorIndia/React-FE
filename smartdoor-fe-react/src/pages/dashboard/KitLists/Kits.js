import React from 'react'
import KitList from './Kits/KitList'
import UnInstalledKitList from './UnInstalledKitList/UnInstalledKitList'
import UnAssignedKitList from './UnAssignedKitList/UnAssignedKitList'

const Kits = () => {
  return (

    <>
        <KitList></KitList>
        <UnInstalledKitList></UnInstalledKitList>
        <UnAssignedKitList></UnAssignedKitList>
    </>
  )
}

export default Kits