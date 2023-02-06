import {
  Field,
  withDatasourceCheck,
  GraphQLRequestClient,
  constants,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import config from 'temp/config';

type LatestJobProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    subHeading: Field<string>;
    totalResult: Field<number>;
    templateId: Field<string>;
  };
};

const LatestJob = (props: LatestJobProps): JSX.Element => {
  
  const [latestJobs, setLatestJob] = useState([]);
  useEffect(() => {
    async function loadData(){
      const result = await getSearchData(props.fields.templateId.value, props.fields.totalResult?.value);
      setLatestJob(result.search?.results);
    }
    loadData();
  }, []);

  return (
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
              __html: `mootrack('LatestJobViewed')`,
            }}
          ></Script>          

          {latestJobs && latestJobs.map((job: any) => (
              <div className="journey-templates-card">
              <div className='journey-templates-card-header'>
                <div className='journey-templates-card-header-left'>
                  <div className='journey-templates-card-header-lifecycle-icon'></div>
                  <div className='journey-templates-card-header-lifecycle'>{props.fields.heading?.value}</div>
                </div>        
              </div>
              <div className='journey-templates-card-ribbon'>{props.fields.subHeading?.value}</div>
              <div className="journey-templates-card-content">
                <div className='journey-templates-card-content-name'>{getValueByFields(job.fields, "Title")}</div>       
                <div className='journey-templates-card-content-description'>
                {getValueByFields(job.fields, "Description")}
                </div>
                {/* <p>{props.fields.CompanyName?.value}</p>
                <p>{props.fields.Location?.value}</p>
                <p>{props.fields.JobType?.value}</p>         */}
              </div>
              <div className='journey-templates-card-footer'>
                <a className='tile-tag slds-float_right' href={'/job?jobId=' + job.id}>
                    View Job
                  </a>
              </div>
            </div>
          ))}

        </div>
      </div>      
    </>
  );
};

const getValueByFields = (fields: Array<any>, fieldDef: string) => {  
  let value = "";
  fields.forEach(field => {
    if(field["name"] === fieldDef){      
      value = field["jsonValue"].value;
      return;
    }
  });
  return value;;
}

const getSearchData = async (templateId: string, total: number) => {
  console.log('Inside server side props..');
  if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
    return null;
  }

  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: '{4672EB7C-E577-43CC-8B6C-EA04611866A8}',
  });

  const query = `query {
    search(
      where: {
      AND: [
          {
            name: "_templates"
            value: "${templateId}"
            operator: CONTAINS
          },          
          {
            name: "_language",
            value: "en",
            operator: EQ
          }
        ]
      }, 
      first: ${total}
      orderBy: { name: "__smallcreateddate_tdt", direction: DESC }
      )
    {
      results {
        displayName,
        id,
        fields {
          id,
          name,
          definition {
            name
          },
          jsonValue
        }
      }
    }
  }`;

  const result = await graphQLClient.request<any>(query);
  console.log('Top result', result);
  return result;
};

export default withDatasourceCheck()<LatestJobProps>(LatestJob);
