import { Input, InputProps } from 'antd';
import { CreditCardData } from '../../types/interfaces';

type creditCardInputNames = Omit<keyof CreditCardData, 'focused'> & string;

interface CreditCardInputProps extends InputProps {
  name: creditCardInputNames;
  setter: React.Dispatch<React.SetStateAction<CreditCardData>>;
}

const getInputProps = (name: creditCardInputNames): Pick<InputProps, 'type' | 'pattern' | 'placeholder' | 'inputMode'> => {
  switch (name) {
    case 'name':
      return { type: 'text', pattern: '[a-zA-Z\\s]{3,30}', placeholder: 'Имя на карте', inputMode: 'text' };
    case 'cvc':
      return { type: 'password', pattern: '^[\\d]{3,4}$', placeholder: 'CVC', inputMode: 'numeric' };
    case 'expiry':
      return { type: 'tel', pattern: '^(0[1-9]|1[0-2])\/?(20[0-9]{2}|[0-9]{2})$', placeholder: 'ММ/ГГ', inputMode: 'numeric' };
    default:
      return { type: 'tel', pattern: '[0-9\\s]{13,19}', placeholder: 'Номер карты', inputMode: 'numeric' };
  }
}

const stopKeyboardEvent = (e: React.BaseSyntheticEvent) => {
  e.stopPropagation();
  e.preventDefault();
}

const CreditCardInput: React.FC<CreditCardInputProps> = ({ name, setter }) => {
  const { inputMode, pattern, placeholder, type } = getInputProps(name);

  const handleCreditCardKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isNumberPressed = e.key.match(new RegExp('[0-9]'));
    const isMovingKey = e.key === 'Backspace' || e.key === 'Tab' || e.key === 'ArrowLeft' || e.key === 'ArrowRight'
      || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Delete';
    if (name === 'expiry') {
      const isValidKey = (e.key.match(new RegExp('[0-9\/]')) && e.currentTarget.value.length <= 6) || isMovingKey;
      if (isValidKey) {
        const isNeedToAddSlash = e.currentTarget.value.length === 2 && isNumberPressed;
        if (isNeedToAddSlash) {
          e.currentTarget.value += '/';
        }
      } else {
        stopKeyboardEvent(e);
      }
    } else if (name === 'number') {
      const isValidKey = (e.key.match(/^[\d\s]/) && e.currentTarget.value.length <= 18) || isMovingKey;
      if (isValidKey) {
        const isDealingWithSpace = e.currentTarget.value.length && (e.currentTarget.value.replaceAll(' ', '').length) % 4 === 0;
        if (isDealingWithSpace) {
          const isDeletingSpace = e.key === 'Backspace';
          const isAddingSpace = isNumberPressed;
          if (isAddingSpace) {
            e.currentTarget.value += ' ';
          } else if (isDeletingSpace) {
            e.currentTarget.value.trimEnd();
          }
        }
      } else {
        stopKeyboardEvent(e);
      }
    } else if (name === 'name') {
      const isValidKey = (e.key.match(new RegExp('^[a-zA-Z ]')) && e.currentTarget.value.length <= 30) || isMovingKey;
      if (!isValidKey) {
        stopKeyboardEvent(e);
      }
    } else if (name === 'cvc') {
      const isValidKey = (isNumberPressed && e.currentTarget.value.length <= 2) || isMovingKey;
      if (!isValidKey) {
        stopKeyboardEvent(e);
      }
    }
  }

  const handleCreditCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setter((data) => (name in data ? { ...data, [name]: value } : data));
  }

  const handleCreditCardFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (name === 'cvc' || name === 'expiry' || name === 'name' || name === 'number') {
      setter((prev) => ({ ...prev, focused: name }))
    }
  }

  return (
    <Input
      inputMode={inputMode}
      pattern={pattern}
      maxLength={19}
      placeholder={placeholder}
      type={type}
      name={name}
      onKeyDown={handleCreditCardKey}
      onChange={handleCreditCardChange}
      onFocus={handleCreditCardFocus}
      required
    />
  );
}

export default CreditCardInput;
