import { useMutation } from '@apollo/react-hooks';

import { useToast, useModal } from 'hooks';
import { useForm } from 'react-hook-form';
import { rules } from 'lib/rules';

import { CREATE_VARIETY } from 'lib/gql/mutations';
import { TextArea, Submit } from 'components/Form';

import parse from 'lib/utils/parseApolloErrors';

import Message from 'components/Message';

const CreateVariety = () => {
    const { addToast } = useToast();
    const { closeModal } = useModal();
    const { register, handleSubmit, errors } = useForm({
        mode: 'onChange',
    });

    const [createVariety, { loading }] = useMutation(CREATE_VARIETY, {
        onCompleted: () => {
            addToast('Votre liste de souhaits a été mise à jour avec succès.', {
                color: 'is-success',
                duration: 7500,
            });
            closeModal();
        },
        onError: data => {
            const { serverErrors } = parse(data);
            let isWarning = false;

            serverErrors.forEach(error => {
                if (
                    error?.message &&
                    error.message === 'ALREADY_EXIST_IN_OTHER_LIST'
                ) {
                    isWarning = true;
                    addToast(
                        'Merci beaucoup ! Un email vous sera envoyé dès que cette variété sera disponible.',
                        {
                            id: 'toast__already-exists-error',
                            color: 'is-warning',
                            duration: 7500,
                        }
                    );
                }
            });
            if (!isWarning && serverErrors.length) {
                addToast(
                    "Un problème est survenu, veuillez retenter l'opération.",
                    {
                        id: 'toast__unexpected-error',
                        color: 'is-danger',
                        duration: 7500,
                    }
                );
            }
        },
    });

    const onSubmit = data => {
        createVariety({
            variables: { name: data.description, family: 'unvailable' },
        });
    };

    return (
        <div className="box">
            <h4 className="title is-4">Demande</h4>
            <h6 className="subtitle is-6">
                Création d&apos;une nouvelle variété
            </h6>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextArea
                    id="pedlg__settings-description-0"
                    label="Identification de la variété"
                    name="description"
                    error={errors.description}
                    register={register({
                        required: rules.required,
                        validate: rules.description.len([25, 255]),
                    })}
                    defaultValue="Je souhaiterais pouvoir rajouter la variété {nom de la variété} appartenant à la famille {nom de la famille} et {toutes autres informations}"
                />
                <Message color="is-info" size="is-small">
                    <p>
                        {`Actuellement les variétés que vous nous proposez sont
                        ajoutées par nos soins.`}
                    </p>
                    <p>
                        {`Cependant, d'ici peu vous pourrez créer vous-même de
                        nouvelles variétés pour toute la communauté PEDLG.`}
                    </p>
                </Message>
                <Submit
                    text="Envoyer"
                    color="is-primary"
                    fullwidth
                    disabled={Object.keys(errors).length !== 0}
                    loading={loading}
                />
            </form>
        </div>
    );
};

export default CreateVariety;
