import React, {
  ImgHTMLAttributes,
  ReactElement,
  ComponentType,
  ComponentElement,
  useState,
  useRef,
  useCallback,
} from 'react'
import { IconBaseProps } from 'react-icons'
import { BodyButton } from './styles'
import { GenIcon } from 'react-icons'

interface DropdownProps {
  DropButton: ComponentType<IconBaseProps>
}
const Dropdown: React.FC<DropdownProps> = ({ DropButton, children }) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = useCallback(() => {
    setIsOpen(!isOpen)
    if (buttonRef.current != null) {
      isOpen ? buttonRef.current.blur() : buttonRef.current.focus()
    }
  }, [isOpen])
  return (
    <BodyButton
      asideOpen={isOpen}
      ref={buttonRef}
      onBlur={() => setIsOpen(false)}
    >
      <DropButton onClick={handleClick} id="btn-drop" />
      <aside>{children}</aside>
    </BodyButton>
  )
}

export default Dropdown
