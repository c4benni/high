import React from 'react';
import Form from '../../Form/Form';
import { SearchIcon } from '../../Icon/Generic/Search';
import IconWrapper from '../../Icon/Logo/IconWrapper';
import { ClassName, className } from '../../utils/main';
import TextField from './TextField';

type SearchProps = {
    label: string;
    placeholder: string;
    value: string;
    onModel: Function
    disabled?: boolean
}

function Search(props: SearchProps) {
    return <TextField
        label={props.label}
        placeholder={props.placeholder}
        hideLabel
        type={'search'}
        disabled={props.disabled}
        value={props.value}
        onModel={props.onModel}
        className='text-sm'
        wrapperClassName={[
            'h-[40px] md:h-[28px]'
        ]}
        inputClassName={'pl-[32px] md:pl-[24px] border-none bg-gray-200 dark:bg-gray-900'}
        append={
            <IconWrapper
                className={
                    className([
                        'absolute w-[32px] md:w-[24px] justify-center flex pointer-events-none left-0',
                    ])
                }
            >
                <SearchIcon />
            </IconWrapper>
        }
    />
}

type Props = {
    useForm?: boolean;
    formName?: string;
    label: string;
    placeholder: string;
    className?: ClassName;
    value?: string;
    onModel?: Function
    disabled?: boolean
}

function SearchField(props: Props) {
    // @ts-ignore
    const SearchInput = <Search
        label={props.label}
        placeholder={props.placeholder}
        {
        ...(props.onModel && typeof props.value == 'string' ? {
            value: props.value,
            onModel: props.onModel
        } : {})
        }
        disabled={props.disabled}
    />

    return props.useForm ?
        <Form
            name={props.formName || ''}
            className={
                props.className || 'mx-auto w-full'
            }
        >
            {SearchInput}
        </Form>
        : SearchInput
}

SearchField.defaultProps = {
    useForm: true
}

export default SearchField;
