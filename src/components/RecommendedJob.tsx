import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type RecommendedJobProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const RecommendedJob = (props: RecommendedJobProps): JSX.Element => (
  <div>
    <p>RecommendedJob Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default withDatasourceCheck()<RecommendedJobProps>(RecommendedJob);
