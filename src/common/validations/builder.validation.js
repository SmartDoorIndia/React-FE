import * as Yup from 'yup';
import ValidationMessages from '../helpers/ValidationMessages';

const fieldRequired = ValidationMessages.fieldRequired.required;

export const editBuilderValidationSchema = Yup.object({

        projectGroup: Yup.string().required(fieldRequired),
        projectName: Yup.string().required(fieldRequired),
        projectType: Yup.string().required(fieldRequired),
        organizationType: Yup.string().required(fieldRequired)

}).required();



// Yup.object().shape({

//         projectGroup: Yup.string().required(fieldRequired),
//         projectName: Yup.string().required(fieldRequired),
//         projectType: Yup.string().required(fieldRequired),
//         organizationType: Yup.string().required(fieldRequired)

//         // tickets: Yup.array().of(
//         //     Yup.object().shape({
//         //         name: Yup.string()
//         //             .required(fieldRequired),
//         //         email: Yup.string()
//         //             .email('Email is Invalid')
//         //             .required('Email is required')
//         //     })
//         // )
//     }).required();
