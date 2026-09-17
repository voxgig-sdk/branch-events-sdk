<?php
declare(strict_types=1);

// BranchEvents SDK utility: result_headers

class BranchEventsResultHeaders
{
    public static function call(BranchEventsContext $ctx): ?BranchEventsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
