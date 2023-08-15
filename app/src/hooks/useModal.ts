import {useCallback, useState} from 'react';

export default function useModal(defaultValue: boolean = false) {
  const [visible, setVisible] = useState(defaultValue);
  const close = useCallback(() => setVisible(false), []);
  const open = useCallback(() => setVisible(true), []);

  return [visible, open, close] as const;
}
