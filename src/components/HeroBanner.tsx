import { Field, withDatasourceCheck, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type HeroBannerProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    heroTitle: Field<string>;
    heroDesc: Field<string>;
    heroImage: ImageField;
  };
};

const HeroBanner = (props: HeroBannerProps): JSX.Element => {
  const css = `.hero-background {
      background-image: url(${props.fields.heroImage?.value?.src});
  }`;

  return (
    <>
      <style scoped suppressHydrationWarning>
        {css}
      </style>
      <div className="hero-banner hero-background">
        <h1>{props.fields.heroTitle?.value}</h1>
        <p>{props.fields.heroDesc?.value}</p>
      </div>
    </>
  );
};

export default withDatasourceCheck()<HeroBannerProps>(HeroBanner);
