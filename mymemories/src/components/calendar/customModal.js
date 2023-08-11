import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './custom.module.css';
import cancelButton from '../../assets/cancelButton.png';
import pink from '../../assets/pink.png';
import bluesky from '../../assets/bluesky.png';
import yellow from '../../assets/yellow.png';
import white from '../../assets/white.png';
import green from '../../assets/green.png';
import violet from '../../assets/violet.png';
import orange from '../../assets/orange.png';


Modal.setAppElement('#root'); // 모달의 루트 엘리먼트 지정

const CustomModal = ({ isOpen, closeModal }) => {
    const [friendEmail, setFriendEmail] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    
    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal}
        className={styles.modalContainer} 
        overlayClassName={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    <p>커스텀하기</p>
                    <button onClick={closeModal} className={styles.cancelButton}>        
                    <img src={cancelButton} alt="취소" /></button>
                </div>
                <div className={styles.title}>
                    <p>배경색</p>
                </div>
                <div className={styles.customList}>
                    <img src={pink} alt="핑크" className={styles.image} />
                    <img src={orange} alt="주황" className={styles.image} />
                    <img src={yellow} alt="노랑" className={styles.image} />
                    <img src={green} alt="연두" className={styles.image} />
                    <img src={violet} alt="보라" className={styles.image} />
                    <img src={bluesky} alt="하늘" className={styles.image} />
                    <img src={white} alt="하양" className={styles.image} />
                </div>
            </div>
        </Modal>
      );
}

export default CustomModal;