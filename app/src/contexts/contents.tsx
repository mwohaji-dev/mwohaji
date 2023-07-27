import React, {useContext, useMemo} from 'react';
import {PropsWithChildren, createContext} from 'react';
import {Content, ContentData, contentInfo} from '../constants/content';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import csv from 'csvtojson';

interface ContentsContext {
  realtimeHotPlace?: ContentData[];
  waitingRestaurant?: ContentData[];
  allContents: Content[];
}

const contentsContext = createContext<ContentsContext>({
  allContents: [],
});

export function useContents() {
  const {realtimeHotPlace, waitingRestaurant, allContents} =
    useContext(contentsContext);

  return {
    realtimeHotPlace,
    waitingRestaurant,
    allContents,
  };
}

export function ContentsProvider({children}: PropsWithChildren) {
  const {data: realtimeHotPlace} = useQuery<ContentData[]>({
    queryKey: ['realtimeHotPlace'],
    queryFn: async () => {
      const {data} = await axios.get(contentInfo.realtimeHotPlace.link);
      const json = await csv().fromString(data);
      return json;
    },
  });
  const {data: waitingRestaurant} = useQuery<ContentData[]>({
    queryKey: ['waitingRestaurant'],
    queryFn: async () => {
      const {data} = await axios.get(contentInfo.waitingRestaurant.link);
      const json = await csv().fromString(data);
      return json;
    },
  });

  const allContents = useMemo(() => {
    const result = [];
    if (realtimeHotPlace) {
      const contents = realtimeHotPlace.map<Content>(obj => ({
        ...obj,
        type: 'realtimeHotPlace',
      }));
      result.push(...contents);
    }
    if (waitingRestaurant) {
      const contents = waitingRestaurant.map<Content>(obj => ({
        ...obj,
        type: 'waitingRestaurant',
      }));
      result.push(...contents);
    }
    return result;
  }, [realtimeHotPlace, waitingRestaurant]);

  return (
    <contentsContext.Provider
      value={{
        realtimeHotPlace,
        waitingRestaurant,
        allContents,
      }}>
      {children}
    </contentsContext.Provider>
  );
}
