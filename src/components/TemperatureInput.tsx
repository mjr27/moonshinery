import {NumberInputProps} from "@mantine/core/lib/NumberInput/NumberInput";
import React from "react";
import {NumberInput} from "@mantine/core";

export const TemperatureInput = (props: NumberInputProps & React.RefAttributes<HTMLInputElement>) => {
    return <NumberInput
        {...props}
        maxLength={3}
        minLength={1}
    />

}