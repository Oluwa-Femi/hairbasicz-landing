import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Arrow from "../../assets/ArrowBack.svg"

const ModalComp = (props) => {
  const {
    isOpen,
    setIsOpen,
    title,
    children,
    showCloseButton,
    handleBack,
    isBack = false

  } = props
  return (
    <Modal isCentered isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent width={{ base: "90%", sm: "80%", md: "60%", lg: "50%" }} margin={0}>
        <ModalHeader borderBottom="1px solid #EBEEF2" marginBottom="1.5">
          <div className="flex gap-2 items-center">
            {isBack && (
              <div
                role={"presentation"}
                onClick={(instance) => handleBack(instance)} className="rounded-full h-[2em] w-[2em] flex justify-center cursor-pointer">
            <img width="30em" src={Arrow} alt="back arrow" />
          </div>
              )}
            <p className="text-[16px] font-[Gilroy-medium]">{title}</p>
          </div>
        </ModalHeader>
        {showCloseButton && <ModalCloseButton />}
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComp;
