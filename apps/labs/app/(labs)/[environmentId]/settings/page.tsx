import { Metadata } from 'next';
import PageWrapper from '@labs/_components/page-wrapper';
import PageHeader from '../../_components/page-header';
import ServerAuthSessionService from '../../_services/server-auth-session-service';
import { Environment } from '../../_interfaces/environment';
import GeneralSettings from './_components/general-settings';
import AuthSettings from './_components/auth-settings';
import React from 'react';
import DangerZone from './_components/danger-zone';
import SectionHeader from '@/(labs)/_components/section-header';
import APIKeysSettings from './_components/api-key-settings';
import { LuSettings } from 'react-icons/lu';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function Settings() {
  return (
    <>
      <PageHeader title="Settings" icon={LuSettings} withContainer />
      <PageWrapper className="pt-4 grid gap-12">
        <section>
          <GeneralSettings />
        </section>

        <section>
          <SectionHeader
            title="Authentication Settings"
            description="Configure authentication type and tokens expirations"
          />
          <AuthSettings />
        </section>

        <section>
          <SectionHeader
            title="API Settings"
            description="Connect these keys with our libraries, SDKs, or APIs"
          />

          <div className="grid gap-1.5">
            <APIKeysSettings />
          </div>
        </section>

        <section>
          <SectionHeader title="Danger Zone" />
          <DangerZone />
        </section>
      </PageWrapper>
    </>
  );
}
