import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type TopJobProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const TopJob = (props: TopJobProps): JSX.Element => (
  <div>
    <p>TopJob Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default withDatasourceCheck()<TopJobProps>(TopJob);
