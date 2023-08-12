import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import styles from './custom.module.css';
import cancelButton from '../../assets/cancelButton.png';
import pink from '../../assets/pink.png';
import lightblue from '../../assets/lightblue.png';
import yellow from '../../assets/yellow.png';
import white from '../../assets/white.png';
import lightgreen from '../../assets/lightgreen.png';
import violet from '../../assets/violet.png';
import orange from '../../assets/orange.png';


Modal.setAppElement('#root'); // 모달의 루트 엘리먼트 지정

const CustomModal = ({ isOpen, closeModal, onColorSelect }) => {
    const [selectedColor, setSelectedColor] = useState('');
    const modalRef = useRef(null); // Ref 생성

    const handleColorClick = (color) => {
      setSelectedColor(color);
      onColorSelect(color); // 부모 컴포넌트로 배경색 전달
      document.body.style.backgroundColor = color; // 전체 화면 배경에 색상 적용

      // 선택한 배경색을 Local Storage에 저장
      localStorage.setItem('selectedColor', color);
    };

    useEffect(() => {
        // Local Storage에서 선택한 배경색 불러오기
        const savedColor = localStorage.getItem('selectedColor');
      
        if (savedColor) {
          setSelectedColor(savedColor);
          document.body.style.backgroundColor = savedColor;
        }

        // 컴포넌트가 마운트되었을 때 이벤트 리스너를 추가
        document.addEventListener('mousedown', handleClickOutside);

        // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    const handleClickOutside = (event) => {
    // 모달 바깥 영역을 클릭하고 모달 창이 열려 있는 경우에만 모달을 닫음
    if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
    }
    };
      
    
    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal}
        className={styles.modalContainer} 
        overlayClassName={styles.modalOverlay}>
            <div ref={modalRef}>
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
                    <button onClick={() => handleColorClick('#FBB7D0')} className={styles.colorButton}>
                        <img src={pink} alt="핑크" />
                    </button>
                    <button onClick={() => handleColorClick('#FC9F66')} className={styles.colorButton}>
                        <img src={orange} alt="주황" />
                    </button>
                    <button onClick={() => handleColorClick('#FAE39D')} className={styles.colorButton}>
                        <img src={yellow} alt="노랑" />
                    </button>
                    <button onClick={() => handleColorClick('#CDE5C5')} className={styles.colorButton}>
                        <img src={lightgreen} alt="연두" />
                    </button>
                    <button onClick={() => handleColorClick('#DCCBED')} className={styles.colorButton}>
                        <img src={violet} alt="보라" />
                    </button>
                    <button onClick={() => handleColorClick('#B8E0E2')} className={styles.colorButton}>
                        <img src={lightblue} alt="하늘" />
                    </button>
                    <button onClick={() => handleColorClick('#FFFFFF')} className={styles.colorButton}>
                        <img src={white} alt="하양" />
                    </button>
                </div>
            </div>
            </div>
        </Modal>
      );
}

export default CustomModal;