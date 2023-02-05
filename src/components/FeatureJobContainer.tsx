import { Field, withDatasourceCheck, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Script from 'next/script';

type FeatureJobContainerProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const FeatureJobContainer = (props: FeatureJobContainerProps): JSX.Element => (
  <main>
    <section id="job-listing">
        <h2>{props.fields.heading?.value}</h2>
        <div className="job-listing-container">
          <Script
            id="moosend_track"
            dangerouslySetInnerHTML={{
              __html: `mootrack('Pageview: Job Details with ID: Job Listing page visited')`,
            }}
          ></Script>          
          <Placeholder name="feature-job-placeholder" rendering={props.rendering} />                         
        </div>
      </section>      
    </main>
);

export default withDatasourceCheck()<FeatureJobContainerProps>(FeatureJobContainer);
