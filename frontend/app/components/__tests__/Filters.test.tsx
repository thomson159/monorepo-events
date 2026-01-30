import { render, screen, fireEvent } from '@testing-library/react';
import { Filters } from '../Filters';
import { EventLevel } from '../../types/event';

describe('Filters', () => {
  it('calls onChange when filter values change', () => {
    const handleChange = jest.fn();
    render(<Filters onChange={handleChange} />);

    const fromInput = screen.getByLabelText('From');
    fireEvent.change(fromInput, { target: { value: '2026-01-30T10:00' } });
    expect(handleChange).toHaveBeenCalledWith({ fromDate: '2026-01-30T10:00' });

    const minLevelSelect = screen.getByLabelText('Min Level');
    fireEvent.change(minLevelSelect, { target: { value: EventLevel.WARNING.toString() } });
    expect(handleChange).toHaveBeenCalledWith({ minLevel: EventLevel.WARNING });
  });
});
