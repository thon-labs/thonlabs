import { envURL, labsAPI } from '../../helpers/api';
import { useToast } from '@repo/ui/hooks/use-toast';
import { APIErrors } from '@helpers/api/api-errors';
import { NewOrganizationFormData } from '@/_validators/organizations-validators';
import { Organization } from '@/_interfaces/organization';
import useOptimisticUpdate from '@/_hooks/use-optimistic-update';
import { useParams } from 'next/navigation';

export default function useOrganization() {
  const { toast } = useToast();
  const { makeMutations } = useOptimisticUpdate();
  const { environmentId } = useParams();

  async function createOrganization({
    logo,
    ...payload
  }: NewOrganizationFormData) {
    try {
      const { data } = await labsAPI.post<Organization>(
        '/organizations',
        payload,
      );

      if (logo && logo?.[0]) {
        await labsAPI.patch<Organization>(
          `/organizations/${data.id}/logo`,
          { file: logo[0] },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
      }

      toast({
        title: 'Organization Created',
        description: `Your organization ${payload.name} has been successfully created.`,
      });

      makeMutations([
        {
          cacheKey: envURL('/organizations', environmentId as string),
          populateCache: (_, organizations) => ({
            ...organizations,
            items: [...organizations.items, data],
          }),
        },
      ]);

      return data;
    } catch (error: any) {
      console.error('useOrganization.createOrganization', error);
      toast({
        title: 'Creating Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
      throw error;
    }
  }

  return {
    createOrganization,
  };
}