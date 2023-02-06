import { Field, withDatasourceCheck, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Script from 'next/script';

type FeatureJobContainerProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const FeatureJobContainer = (props: FeatureJobContainerProps): JSX.Element => (
  <>  
    <div id="job-listing">
        <div className='journey-templates-header'>
          <div className='journey-templates-header-title slds-float_left'>
            <div className='slds-float_left'>
              <span>                
              </span>
            </div>
          </div>
          <h1 className='slds-text-heading--medium slds-float_left'>{props.fields.heading?.value}</h1>
        </div>
        <div className='slick-slide slick-active' style={{outline: "none"}}>
          <Script
            id="moosend_track"
            dangerouslySetInnerHTML={{
              __html: `mootrack('Pageview: Job Details with ID: Job Listing page visited')`,
            }}
          ></Script>          
          <Placeholder name="feature-job-placeholder" rendering={props.rendering} />                         
        </div>
      </div>      
    </>
);

export default withDatasourceCheck()<FeatureJobContainerProps>(FeatureJobContainer);
