import * as Yup from 'yup';

export const SubcriptionSchema = Yup.object({
    email:Yup.string().email().required("Please enter an email")
})