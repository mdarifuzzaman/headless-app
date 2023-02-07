import { constants, Field, GraphQLRequestClient, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import config from 'temp/config';

type SearchResultProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    title: Field<string>;
    sortField: Field<string>;
    sortOrder: Field<string>;
    templateId: Field<string>;
  };
};

const filterData = (results: Array<any>, keyword: string | null): Array<any> => {
  const filteredResult = new Array<any>();
  if(!keyword){
    return results;
  }

  if(!results || results.length == 0) return filteredResult;
  results.forEach((rs: any) => {
    rs.fields.forEach((fl: any) => {
      if(fl.jsonValue.value.includes(keyword)){
        filteredResult.push(rs);
        return;
      }
    });
  });
  
  return filteredResult;

}

const SearchResult = (props: SearchResultProps): JSX.Element => {
  
  const [latestJobs, setLatestJob] = useState(Array<any>);
  useEffect(() => {
    async function loadData(){
      const result = await getSearchData(props.fields.templateId.value, props.fields.sortOrder?.value, props.fields.sortField?.value);
      const keyword = new URLSearchParams(window.location?.search).get('keywords');
      const actualSeachResults = filterData(result.search?.results, keyword);      
      setLatestJob(actualSeachResults);
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
          <h1 className='slds-text-heading--medium slds-float_left'>{props.fields.heading?.value} | Total {latestJobs.length}</h1>
        </div>
        <div className='slick-slide slick-active' style={{outline: "none"}}>
          <Script
            id="moosend_track"
            dangerouslySetInnerHTML={{
              __html: `mootrack('Search: executed')`,
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
              <div className='journey-templates-card-ribbon'>Search Result</div>
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

const getSearchData = async (templateId: string, sortBy: string, sortField: string) => {
  console.log('Inside server side props..');
  if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
    return null;
  }

  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: '{4672EB7C-E577-43CC-8B6C-EA04611866A8}',
  });

  // const query = `query {
  //   search(rootItem:"${templateId}", keyword: "${new URLSearchParams(window.location?.search).get('keywords')}"){
  //     results {
  //       totalCount
  //       items {
  //         path
  //         name
  //         fields {
  //           name
  //           value
  //         }
  //       }
  //     }
  //   }`;

  // {
  //   name: "__text__",
  //   value: "${new URLSearchParams(window.location?.search).get('keywords')}",
  //   operator: CONTAINS
  // },

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
      orderBy: { name: "${sortField}", direction: ${sortBy} }
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

export default withDatasourceCheck()<SearchResultProps>(SearchResult);
