import { render, screen } from '@testing-library/react';
import App from './App';
import { recordParser, calculatePoints } from './services/transaction.api'


test('correct point Value',()=>{

  const noPoint = calculatePoints(49.4)
  const lowPoints = calculatePoints(98)
  const highPoints = calculatePoints(120)
  expect(noPoint).toBe(0)
  expect(lowPoints).toBe(48)
  expect(highPoints).toBe(90)
})

