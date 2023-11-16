'use client'

import {ApiErrorCode} from "@/app/common/ApiErrorCode";
import {ErrorAlert} from "@/app/components/operation/response/ErrorAlert";
import TextApiSpecImport from "@/app/settings/apis/imports/components/TextApiSpecImport";
import UrlApiSpecImport from "@/app/settings/apis/imports/components/UrlApiSpecImport";
import {KeyboardArrowDown} from "@mui/icons-material";
import {Box, FormControl, FormLabel} from "@mui/joy";
import Option from '@mui/joy/Option';
import Select, {selectClasses} from "@mui/joy/Select";
import {useState} from "react";
import {Problem} from "@/app/lib/dto/Problem";

export type ImportMode = 'url' | 'file';

type ImportApiSpecProps = {
    onImportSucceeded: (mode: ImportMode, apiSpecId: string) => void,
    sx?: any
}

export default function ImportApiSpec({onImportSucceeded, sx}: ImportApiSpecProps) {
    const [importMode, setImportMode] = useState<ImportMode>('url');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(undefined);
    const [showNoDefaultServersWarningModal, setShowNoDefaultServersWarningModal] = useState<boolean>(false);

    const onImportFailed = (problem: Problem) => {
        if (problem.code === ApiErrorCode.NoDefaultServersError) {
            setShowNoDefaultServersWarningModal(true);
        } else {
            setError(error);
        }
    }

    const onModalClose = () => {
        setShowNoDefaultServersWarningModal(false);
    }

    return (
        <Box sx={{...sx}}>
            <FormControl sx={{mt: 1}}>
                <FormLabel htmlFor="import-mode-select" id="select-label">
                    From
                </FormLabel>
                <Select
                    onChange={(_, value) => setImportMode(value as ImportMode)}
                    value={importMode}
                    indicator={<KeyboardArrowDown/>}
                    disabled={loading}
                    slotProps={{
                        button: {
                            id: 'import-mode-select',
                            'aria-labelledby': 'select-label select-button',
                        }
                    }}
                    sx={{
                        maxWidth: 250,
                        mb: 2,
                        [`& .${selectClasses.indicator}`]: {
                            transition: '0.2s',
                            [`&.${selectClasses.expanded}`]: {
                                transform: 'rotate(-180deg)',
                            },
                        },
                    }}
                >
                    <Option value="url">URL</Option>
                    <Option value="file">File</Option>
                </Select>
            </FormControl>

            {importMode === 'url' &&
                <UrlApiSpecImport
                    onUrlImportSucceeded={onImportSucceeded}
                    onUrlImportFailed={onImportFailed}
                    showWarningModal={showNoDefaultServersWarningModal}
                    onWarningModalClose={onModalClose}
                    onLoading={loading => setLoading(loading)}/>}

            {importMode === 'file' &&
                <TextApiSpecImport
                    onTextImportSucceeded={onImportSucceeded}
                    onTextApiImportFailed={onImportFailed}
                    showWarningModal={showNoDefaultServersWarningModal}
                    onWarningModalClose={onModalClose}
                    onLoading={loading => setLoading(loading)}/>}

            <ErrorAlert error={error} onClose={() => setError(undefined)}/>
        </Box>
    );
}