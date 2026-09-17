<?php
declare(strict_types=1);

// BranchEvents SDK utility: result_body

class BranchEventsResultBody
{
    public static function call(BranchEventsContext $ctx): ?BranchEventsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
