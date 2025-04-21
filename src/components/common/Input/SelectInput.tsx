import * as S from './selectInput.style';
import SearchIcon from '@/assets/icons/searchIcon.svg'; // 돋보기 아이콘

interface SelectInputProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    onConfirm: () => void;
    directInputLabel?: string;
    style?: React.CSSProperties;
}

export const SelectInput = ({
    placeholder,
    value,
    onChange,
    onConfirm,
    directInputLabel = '직접 입력',
    style,
}: SelectInputProps) => {
    return (
        <S.InputWrapper style={style}>
            <S.InputContainer>
                <S.StyledInput
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={e => onChange(e.target.value)}
                />
                <S.IconButton>
                    <img src={SearchIcon} alt="검색" />
                </S.IconButton>
            </S.InputContainer>
            <S.DirectInputButton onClick={onConfirm} active={value.trim().length > 0}>
                {directInputLabel}
            </S.DirectInputButton>
        </S.InputWrapper>
    );
};
