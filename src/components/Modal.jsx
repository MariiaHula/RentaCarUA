import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const rootModal = document.querySelector('#modal');

const Modal = ({ children, closeModal }) => {
  useEffect(() => {
    const handleModalCloseKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleModalCloseKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleModalCloseKeyDown);
      document.body.style.overflow = 'visible';
    };
  }, [closeModal]);

  const handleModalClose = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };
  return ReactDOM.createPortal(
    <div
      onClick={handleModalClose}
      className="fixed inset-0 flex items-center justify-center bg-[#12141780] bg-opacity-50"
    >
      <div>{children}</div>
    </div>,
    rootModal
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
};
