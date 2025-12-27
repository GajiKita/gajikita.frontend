import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    // Clear all items from localStorage before each test
    localStorage.clear();
  });

  it('should return the initial value if no item in localStorage', () => {
    // Arrange & Act
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'));

    // Assert
    expect(result.current[0]).toBe('default-value');
  });

  it('should return the stored value if item exists in localStorage', () => {
    // Arrange
    localStorage.setItem('test-key', JSON.stringify('stored-value'));

    // Act
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'));

    // Assert
    expect(result.current[0]).toBe('stored-value');
  });

  it('should set value in localStorage', () => {
    // Arrange
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'));

    // Act
    act(() => {
      result.current[1]('new-value');
    });

    // Assert
    expect(result.current[0]).toBe('new-value');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'));
  });

  it('should handle complex objects', () => {
    // Arrange
    const { result } = renderHook(() => useLocalStorage('obj-key', { name: 'John', age: 30 }));

    // Act
    const newValue = { name: 'Jane', age: 25 };
    act(() => {
      result.current[1](newValue);
    });

    // Assert
    expect(result.current[0]).toEqual(newValue);
    expect(JSON.parse(localStorage.getItem('obj-key') || '{}')).toEqual(newValue);
  });

  it('should handle arrays', () => {
    // Arrange
    const { result } = renderHook(() => useLocalStorage('array-key', [1, 2, 3]));

    // Act
    const newArray = [4, 5, 6];
    act(() => {
      result.current[1](newArray);
    });

    // Assert
    expect(result.current[0]).toEqual(newArray);
    expect(JSON.parse(localStorage.getItem('array-key') || '[]')).toEqual(newArray);
  });

  it('should remove item when setting undefined', () => {
    // Arrange
    localStorage.setItem('remove-key', JSON.stringify('to-be-removed'));
    const { result } = renderHook(() => useLocalStorage('remove-key', 'default'));

    // Act
    act(() => {
      result.current[1](undefined);
    });

    // Assert
    expect(result.current[0]).toBeUndefined();
    expect(localStorage.getItem('remove-key')).toBeNull();
  });

  it('should handle JSON parsing errors gracefully', () => {
    // Arrange
    localStorage.setItem('invalid-json', 'not-valid-json');

    // Act
    const { result } = renderHook(() => useLocalStorage('invalid-json', 'default-value'));

    // Assert
    expect(result.current[0]).toBe('default-value');
  });

  it('should update value without triggering unnecessary re-renders', () => {
    // Arrange
    const { result } = renderHook(() => useLocalStorage('count-key', 0));

    // Act
    act(() => {
      result.current[1](1);
      result.current[1](2);
      result.current[1](3);
    });

    // Assert
    expect(result.current[0]).toBe(3);
  });

  it('should work with different data types', () => {
    // String
    const { result: stringResult } = renderHook(() => useLocalStorage('string-key', ''));
    act(() => { stringResult.current[1]('hello'); });
    expect(stringResult.current[0]).toBe('hello');

    // Number
    const { result: numberResult } = renderHook(() => useLocalStorage('number-key', 0));
    act(() => { numberResult.current[1](42); });
    expect(numberResult.current[0]).toBe(42);

    // Boolean
    const { result: boolResult } = renderHook(() => useLocalStorage('bool-key', false));
    act(() => { boolResult.current[1](true); });
    expect(boolResult.current[0]).toBe(true);

    // Null
    const { result: nullResult } = renderHook(() => useLocalStorage('null-key', 'default'));
    act(() => { nullResult.current[1](null); });
    expect(nullResult.current[0]).toBeNull();
  });

  it('should sync across multiple instances of the same key', () => {
    // Arrange
    const { result: result1 } = renderHook(() => useLocalStorage('sync-key', 'initial'));
    const { result: result2 } = renderHook(() => useLocalStorage('sync-key', 'initial'));

    // Act - update from first instance
    act(() => {
      result1.current[1]('updated');
    });

    // Assert - second instance should reflect the change
    expect(result2.current[0]).toBe('updated');
  });
});