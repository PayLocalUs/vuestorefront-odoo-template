/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref } from '@vue/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';
import { GraphQlGetCountryParams } from '@vue-storefront/odoo-api/src/types';

const useCountrySearch = (): any => {
  const context: Context = useVSFContext();

  const errors = ref({ graphQLErrors: [] });

  const countries = ref([]);
  const countryStates = ref([]);

  const resetCountryErrors = () => (errors.value = { graphQLErrors: [] });

  const search = async () => {
    const response = await context.$odoo.api.getCountries().catch((error) => {
      errors.value = error;
    });

    countries.value = response.countries.countries;
  };

  const searchCountryStates = async (countryId) => {
    if (!countryId) return;

    const params: GraphQlGetCountryParams = {
      id: parseInt(countryId)
    };

    const { country } = await context.$odoo.api
      .getCountryStates(params)
      .catch((error) => {
        errors.value = error;
      });

    countryStates.value = country.states;
  };

  return {
    search,
    resetCountryErrors,
    searchCountryStates,
    countries,
    countryStates,
    errors
  };
};

export default useCountrySearch;
