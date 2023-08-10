import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './calendar.module.css';
import cancelButton from '../../assets/cancelButton.png';

Modal.setAppElement('#root'); // 모달의 루트 엘리먼트 지정

const CalendarModal = ({ isOpen, closeModal, onInviteFriend }) => {
    const [friendEmail, setFriendEmail] = useState('');

    const handleInviteFriend = () => {
        // friendEmail을 처리하거나 서버로 전송하는 로직 구현
        setFriendEmail('');
        closeModal();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal}
        className={styles.modalContainer} 
        overlayClassName={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <p>현재 참가중인 멤버</p>
                <button onClick={closeModal} className={styles.cancelButton}>        
                <img src={cancelButton} alt="취소" /></button>
                <div className={styles.inputAndButtonContainer}>
                    <input
                        type="email"
                        value={friendEmail}
                        onChange={(e) => setFriendEmail(e.target.value)}
                    />
                    <button onClick={handleInviteFriend}>초대하기</button>
                </div>
                <div className={styles.memberList}>
                {/* 멤버 리스트를 원하는 위치로 배치 */}
                <ul>
                    <li>멤버 1</li>
                    <li>멤버 2</li>
                    {/* ... */}
                </ul>
                </div>
            </div>
        </Modal>
      );
}

export default CalendarModal;
