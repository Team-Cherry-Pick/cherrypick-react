import { TextInput } from './TextInput';
import { TextArea } from './TextArea';
import { SelectTrigger } from './SelectTrigger';

export default {
    title: 'Components/Input',
};

export const DefaultTextInput = () => (
    <TextInput placeholder="상품명을 입력하세요" />
);

export const DefaultTextArea = () => (
    <TextArea placeholder="상품 설명을 입력하세요" />
);

export const DefaultSelectTrigger = () => (
    <SelectTrigger label="카테고리 선택" />
);
