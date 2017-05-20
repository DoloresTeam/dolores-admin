import { Field } from 'redux-form';
const ReferenceManyInput = () => (
    <span>
        <Field name="lat" component="input" type="number" placeholder="latitude" />
        &nbsp;
        <Field name="lng" component="input" type="number" placeholder="longitude" />
    </span>
);

export default LatLngInput;
