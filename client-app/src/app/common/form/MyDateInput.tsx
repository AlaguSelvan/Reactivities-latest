import { useField } from 'formik'
import React from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { Form } from 'semantic-ui-react'

const MyDateInput = (props: Partial<ReactDatePickerProps>) => {
  const [field, meta, helpers] = useField(props.name!)
  return (
    <Form.Field>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value: any) => helpers.setValue(value)}
      />
    </Form.Field>
  )
}

export default MyDateInput
