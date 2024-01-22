import { UpdatableValue } from "@/app/lib/model/UpdatableValue";
import Input from "@mui/joy/Input";
import React, { HTMLInputTypeAttribute } from "react";

export type ManualInputValueType = string | ReadonlyArray<string> | number | undefined;

export interface ManualInputProps {
    type: HTMLInputTypeAttribute
    onChange?: (value: ManualInputValueType) => void
    onFocus?: React.FocusEventHandler
    onBlur?: React.FormEventHandler
    defaultValue?: ManualInputValueType
    updatableValue?: UpdatableValue<any>
    placeholder?: string | undefined
    required?: boolean
    disabled?: boolean
    readOnly?: boolean
    endDecorator?: React.ReactNode
    min?: number
    max?: number
    sx?: {}
}

export const ManualInput = ({
    type,
    defaultValue,
    updatableValue,
    placeholder,
    onChange,
    onFocus,
    onBlur,
    required,
    disabled,
    readOnly,
    endDecorator,
    min,
    max,
    sx,
}: ManualInputProps) => {

    return (
        <Input
            sx={{
                ...sx,
            }}
            type={type}
            defaultValue={defaultValue}
            value={updatableValue?.value}
            placeholder={placeholder}
            required={required}
            endDecorator={endDecorator}
            disabled={disabled || readOnly}
            onChange={(event) => onChange?.(event?.target.value) || updatableValue?.onValueUpdate(event.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            slotProps={{
                input: {
                    min: min,
                    max: max,
                }
            }}
            readOnly={readOnly} />
    )
}