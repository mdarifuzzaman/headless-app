import {
  Field,
  withDatasourceCheck,
  GetStaticComponentProps,
  constants,
  GraphQLRequestClient,
  useComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Script from 'next/script';
import config from 'temp/config';

type JobListingProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const JobListing = (props: JobListingProps): JSX.Element => {
  const data = useComponentProps<any>(props.rendering.uid);
  const allJobs = data.search?.results;
  console.log('allJobs - job listing', allJobs);

  return (
    <main>
      <Script
        id="moosend_identify"
        dangerouslySetInnerHTML={{
          __html: `mootrack('joblistpage')`,
        }}
      ></Script>
      <section id="job-listing">
        <h2>Job Listing</h2>
        <div className="job-listing-container">
          <Script
            id="moosend_track"
            dangerouslySetInnerHTML={{
              __html: `mootrack('Pageview: Job Details with ID: Job Listing page visited')`,
            }}
          ></Script>
          {allJobs &&
            allJobs.map((fj: any) => (
              <div key={fj.displayName} className="job-listing-box">
                <div className="job-listing-box-content">
                  {/* <img src="job1.jpg" alt="job1" /> */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: fj.fields.filter((field: any) => field.name === 'Title')[0].jsonValue
                        ?.value,
                    }}
                  ></div>
                  <p>
                    {
                      fj.fields.filter((field: any) => field.name === 'CompanyName')[0].jsonValue
                        ?.value
                    }
                  </p>
                  <p>
                    {
                      fj.fields.filter((field: any) => field.name === 'Location')[0].jsonValue
                        ?.value
                    }
                  </p>
                  <p>
                    {fj.fields.filter((field: any) => field.name === 'JobType')[0].jsonValue?.value}
                  </p>
                  <a href={'/job?jobId=' + fj.id} className="view-job-btn">
                    View Job
                  </a>
                  <input type={'hidden'} value={fj.id}></input>
                </div>
                <div>
                  <button>Expand</button>
                  <button>Apply</button>
                </div>
              </div>
            ))}
        </div>
      </section>      
    </main>
  );
};

export const getStaticProps: GetStaticComponentProps = async (rendering, layoutData) => {
  if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
    return null;
  }

  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: '{4672EB7C-E577-43CC-8B6C-EA04611866A8}',
  });

  const query = `query {
    search(where: {
      AND: [
          {
            name: "_templates"
            value: "3B0868EC-70AE-585D-94BE-4D2FA9F7A8F9"
            operator: CONTAINS
          },
          {
            name: "_language",
            value: "en",
            operator: EQ
          }
        ]
      }
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

  const result = await graphQLClient.request<any>(query, {
    datasource: rendering.dataSource,
    contextItem: layoutData?.sitecore?.route?.itemId,
    language: layoutData?.sitecore?.context?.language,
  });

  return result;
};

export default withDatasourceCheck()<JobListingProps>(JobListing);
