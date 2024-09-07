import React, { useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useIntl } from 'react-intl';
import {
    useAppInfo,
    SettingsPageTitle,
    useFocusWhenNavigate,
    useNotification,
    useRBAC,
    useTracking,
// @ts-expect-error TS(7016): Could not find a declaration file for module '@str... Remove this comment to see the full error message
} from '@strapi/helper-plugin';
import {
    Button,
    ContentLayout,
    Flex,
    Grid,
    GridItem,
    HeaderLayout,
    Layout,
    Link,
    Main,
    Typography,
// @ts-expect-error TS(7016): Could not find a declaration file for module '@str... Remove this comment to see the full error message
} from '@strapi/design-system';
import { ExternalLink, Check } from '@strapi/icons';
// @ts-expect-error TS(2307): Cannot find module 'ee_else_ce/pages/SettingsPage/... Remove this comment to see the full error message
import AdminSeatInfo from 'ee_else_ce/pages/SettingsPage/pages/ApplicationInfosPage/components/AdminSeatInfo';

// @ts-expect-error TS(2307): Cannot find module '../../../../permissions' or it... Remove this comment to see the full error message
import adminPermissions from '../../../../permissions';
// @ts-expect-error TS(2307): Cannot find module '../../../../hooks' or its corr... Remove this comment to see the full error message
import { useConfigurations } from '../../../../hooks';
// @ts-expect-error TS(2307): Cannot find module './components/CustomizationInfo... Remove this comment to see the full error message
import CustomizationInfos from './components/CustomizationInfos';
// @ts-expect-error TS(2307): Cannot find module './utils/api' or its correspond... Remove this comment to see the full error message
import { fetchProjectSettings, postProjectSettings } from './utils/api';
// @ts-expect-error TS(2307): Cannot find module './utils/getFormData' or its co... Remove this comment to see the full error message
import getFormData from './utils/getFormData';

const ApplicationInfosPage = () => {
    const inputsRef = useRef();
    const toggleNotification = useNotification();
    const { trackUsage } = useTracking();
    const { formatMessage } = useIntl();
    const queryClient = useQueryClient();
    useFocusWhenNavigate();
    const appInfos = useAppInfo();
    const { latestStrapiReleaseTag, shouldUpdateStrapi, strapiVersion } = appInfos;
    const { updateProjectSettings } = useConfigurations();

    const {
        allowedActions: { canRead, canUpdate },
    } = useRBAC(adminPermissions.settings['project-settings']);
    const canSubmit = canRead && canUpdate;

    const { data } = useQuery('project-settings', fetchProjectSettings, { enabled: canRead });

    const submitMutation = useMutation((body) => postProjectSettings(body), {
        async onSuccess({ menuLogo, authLogo }) {
            await queryClient.invalidateQueries('project-settings', { refetchActive: true });
            updateProjectSettings({ menuLogo: menuLogo?.url, authLogo: authLogo?.url });
        },
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!canUpdate) return;

        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        const inputValues = inputsRef.current.getValues();
        const formData = getFormData(inputValues);

        submitMutation.mutate(formData, {
            onSuccess() {
                const { menuLogo, authLogo } = inputValues;

                if (menuLogo.rawFile) {
                    trackUsage('didChangeLogo', {
                        logo: 'menu',
                    });
                }

                if (authLogo.rawFile) {
                    trackUsage('didChangeLogo', {
                        logo: 'auth',
                    });
                }

                toggleNotification({
                    type: 'success',
                    message: formatMessage({ id: 'app', defaultMessage: 'Saved' }),
                });
            },
            onError() {
                toggleNotification({
                    type: 'warning',
                    message: { id: 'notification.error', defaultMessage: 'An error occurred' },
                });
            },
        });
    };

    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Layout>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SettingsPageTitle name="Application" />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Main>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <form onSubmit={handleSubmit}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <HeaderLayout
                        title={formatMessage({ id: 'Settings.application.title', defaultMessage: 'Overview' })}
                        subtitle={formatMessage({
                            id: 'Settings.application.description',
                            defaultMessage: 'Administration panel’s global information',
                        })}
                        primaryAction={
                            canSubmit && (
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <Button type="submit" startIcon={<Check />}>
                                    {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
                                </Button>
                            )
                        }
                    />
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <ContentLayout>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <Flex direction="column" alignItems="stretch" gap={6}>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <Flex
                                direction="column"
                                alignItems="stretch"
                                gap={4}
                                hasRadius
                                background="neutral0"
                                shadow="tableShadow"
                                paddingTop={6}
                                paddingBottom={6}
                                paddingRight={7}
                                paddingLeft={7}
                            >
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <Typography variant="delta" as="h3">
                                    {formatMessage({
                                        id: 'global.details',
                                        defaultMessage: 'Details',
                                    })}
                                </Typography>

                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <Grid gap={5} as="dl">
                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                    <GridItem col={6} s={12}>
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                        <Typography variant="sigma" textColor="neutral600" as="dt">
                                            {formatMessage({
                                                id: 'Settings.application.node-version',
                                                defaultMessage: 'node version',
                                            })}
                                        </Typography>
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                        <Typography as="dd">{appInfos.nodeVersion}</Typography>
                                    </GridItem>
                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                    <AdminSeatInfo />
                                </Grid>
                            </Flex>
                            {canRead && data && (
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <CustomizationInfos
                                    canUpdate={canUpdate}
                                    ref={inputsRef}
                                    projectSettingsStored={data}
                                />
                            )}
                        </Flex>
                    </ContentLayout>
                </form>
            </Main>
        </Layout>
    );
};

export default ApplicationInfosPage;
