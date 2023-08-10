import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './calendar.module.css';
import cancelButton from '../../assets/cancelButton.png';
import UserImage from '../../assets/userImage.png';
import { db } from '../../firebase';
import { getDocs } from 'firebase/firestore';

Modal.setAppElement('#root'); // 모달의 루트 엘리먼트 지정

const InviteModal = ({ isOpen, closeModal, onInviteFriend }) => {
    const [friendEmail, setFriendEmail] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const handleInviteFriend = () => {
        // friendEmail을 처리하거나 서버로 전송하는 로직 구현
        setIsButtonClicked(true);
        setFriendEmail('');
    };

    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
          try {
            const membersRef = db.collection('members');
            const snapshot = await getDocs(membersRef);
    
            const loadedMembers = snapshot.docs.map(doc => doc.data());
            setMembers(loadedMembers);
          } catch (error) {
            console.error('Error fetching members:', error);
          }
        };
    
        fetchMembers();
      }, []);
    
    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal}
        className={styles.modalContainer} 
        overlayClassName={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    <p>현재 참가중인 멤버</p>
                    <button onClick={closeModal} className={styles.cancelButton}>        
                    <img src={cancelButton} alt="취소" /></button>
                </div>
                <div className={styles.inviteContainer}>
                    <img src={UserImage} alt="이미지" className={styles.userImage} />
                    <input
                    type="email"
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                    className={styles.emailInput}
                    placeholder="초대할 친구 이메일 주소 입력"
                    />
                    <button className={styles.inviteButton} onClick={handleInviteFriend}>
                        <span className={styles.inviteButtonText}>초대하기</span>
                    </button>
                </div>
                <div className={styles.memberList}>
                {members.map(member => (
                    <div key={member.id}>
                        <img src={member.imageUrl} alt="Member" />
                        <p>{member.name}</p>
                        <p>{member.email}</p>
                    </div>
                ))}
                </div>
            </div>
        </Modal>
      );
}

export default InviteModal;
