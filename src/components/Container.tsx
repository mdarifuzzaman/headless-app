import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ContainerProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Container = (props: ContainerProps): JSX.Element => (
  <div>
    <p>Container Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default withDatasourceCheck()<ContainerProps>(Container);
