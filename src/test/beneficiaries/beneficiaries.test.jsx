/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, waitFor, screen} from '@testing-library/react'
import { test, expect, describe, jest } from '@jest/globals'
import BeneficiariesList from '../../app/beneficiaries/page.jsx'
import { fetchDataBeneficiaries } from '../../app/beneficiaries/fetch.js'

jest.mock('../../app/beneficiaries/fetch.js');

describe('BeneficiariesList', () => {
  test('Renderizar', async () => {
    const datos = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ];

    fetchDataBeneficiaries.mockResolvedValue(datos);

    const data = await fetchDataBeneficiaries();

    expect(data).toEqual(datos);

    waitFor(() => {
      render(<BeneficiariesList />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });
  });

});