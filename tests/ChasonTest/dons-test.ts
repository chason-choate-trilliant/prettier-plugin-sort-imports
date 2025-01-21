import { forwardRef, useCallback, useState } from "react"
import { combine as c } from "@th/lib/src"
import { vizColors } from "@th/lib/src/viz-colors"
import { useAutoAnimate } from "@th/react-app/deps/auto-animate"
import {
  useFacilityTypeVolumes,
  useFacilityVolumesInfinite,
  useMonthlyVolumes,
  usePayerTypeVolumes,
  useProcedureSubtypeVolumes,
  useProviderGroupVolumesInfinite,
  useProviderVolumesInfinite,
  useQueryProviderInfo,
  useQuickFindFacilityVolumesInfinite,
  useQuickFindProviderGroupVolumesInfinite,
  useQuickFindProviderVolumesInfinite,
} from "../../store"
import { useNetworkViewMode } from "../../store/useNetworkViewMode"
import { useSearchBuilder } from "../../store/useSearchBuilder"
import { getSankeyOptions } from "../lib/helpers"

import {
  HelpButton,
  RadioGroup,
  Switch,
  useToggle,
  useWindowWidthTailwindQuery,
} from "@th/react-app/src"
import {
  AlignmentOverTimeChart,
  FacilityTypeVolumeAndMarketShareChart,
  InfiniteProviderBarChart,
  InfiniteProviderGroupBarChart,
  ProportionOfPayerTypesChart,
  SettingOfCareNetworkChart,
  SettingOfCareVisitVolumeChart,
  SystemAlignmentChart,
  VolumeOverTimeChart,
} from "../charts"
import {
  FacilityTypeCheckbox,
  FilterModeDiv,
  useFilterMode,
  useQuickFind,
  useQuickFindInfinite,
} from "../filter-mode"
import * as term from "../../lib/terms"
import {
  PayerTypesSelector,
  ProcedureSubTypeSelector,
  SelectTimeRange,
  SettingsOfCareSelector,
} from "../filters"

export type SankeyDataType = ReturnType<
  typeof getSankeyOptions
>[number]["value"]

import { networkExplorerProviderSpotlightMainRoute } from "../../routes"
import { ChartWrapper } from "../ChartWrapper"
import { InfiniteFacilityDataTable } from "../FacilityDataTable"
import { QuickFind } from "../QuickFind"
