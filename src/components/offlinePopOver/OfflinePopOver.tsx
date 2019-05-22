import React from 'react'
import useConnection from '../../common/UseConnection'
import styles from './OfflinePopOver.module.scss'
const OfflinePopOver: React.FC = () => {
  const isConnected = useConnection()
  return (
    <div
      className={[styles.PopOver, !isConnected ? styles.SlideDown : null].join(
        ' ',
      )}
    >
      You currently offline but your data are safe
    </div>
  )
}

export default OfflinePopOver
