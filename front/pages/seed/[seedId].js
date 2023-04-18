import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import c from 'classnames';
import css from 'styles/pages/seed/seedId.module.scss';

import returnUpBack from '@iconify/icons-mdi/keyboard-backspace';

import { GET_VARIETY } from 'lib/gql/queries';

import Layout from 'components/Layout';
import Loading from 'components/Loading';
import Header from 'components/search/SearchPage/Header';
import VarietyInfos from 'components/variety/VarietyInfos/VarietyInfos';
import VarietyPeriods from 'components/variety/VarietyPeriods/VarietyPeriods';
import UsersHasVariety from 'components/variety/UsersHasVariety/UsersHasVariety';
import VarietyOverview from 'components/variety/VarietyOverview/VarietyOverview';

const SeedProfile = () => {
    const router = useRouter();
    const { seedId } = router.query;

    const { loading, error, data, refetch } = useQuery(GET_VARIETY, {
        variables: {
            id: Number(seedId),
        },
    });

    if (loading) return <Loading />;

    if (error) return `Error! ${error}`;

    const { variety_request: seed } = data;

    const hR = hiddenFor => (
        <div
            className={`columns is-mobile is-gapless is-marginless is-hidden-${hiddenFor}`}
        >
            <div className="column is-offset-3">
                <div className={css.cardHr}>
                    <hr />
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Layout title="seedProfile">
                <div className={c('container has-margin-top-8', css.container)}>
                    <Header
                        onClick={() => router.back()}
                        title="Retour"
                        icon={returnUpBack}
                    />
                    <div className="columns">
                        <div className="column">
                            <div className={c('card', css['id-card'])}>
                                <VarietyOverview
                                    seed={seed}
                                    refetch={refetch}
                                />
                                {hR('desktop')}

                                <VarietyInfos hiddenFor="desktop" seed={seed} />
                                {hR()}
                                <VarietyPeriods seed={seed} hiddenFor="none" />
                                {hR()}
                                <h6 className="has-margin-left-3 is-marginlessis-hidden-desktop">
                                    <p className="subtitle is-size-5">
                                        Conseils
                                    </p>
                                </h6>
                                <p className="is-size-6 has-margin-3 has-text-justified">
                                    {seed.sowingTips}
                                </p>
                            </div>
                        </div>

                        <div className="column is-4 ">
                            <div
                                className={c(
                                    'card is-hidden-touch',
                                    css['id-card']
                                )}
                            >
                                <VarietyInfos hiddenFor="touch" seed={seed} />
                            </div>

                            <UsersHasVariety
                                varietyId={Number(seedId)}
                                varName={data.variety_request.name}
                            />
                        </div>
                    </div>
                </div>
                <br />
            </Layout>
        </>
    );
};

export default SeedProfile;
