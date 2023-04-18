import { Icon } from '@iconify/react';
import video from '@iconify/icons-mdi/video';

import Video from 'components/Guide';
import Layout from 'components/Layout';

const Guide = () => (
    <Layout title="Guide">
        <section className="section">
            <div className="container">
                <h5 className="title is-5">
                    <span className="icon-wrapper">
                        <span className="icon is-left">
                            <Icon
                                icon={video}
                                className="has-background-primary has-radius"
                            />
                        </span>
                        Guide
                    </span>
                </h5>

                <hr className="is-hidden-mobile is-hidden-touch" />
                <Video />
            </div>
        </section>
    </Layout>
);

export default Guide;
