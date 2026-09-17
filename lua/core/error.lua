-- BranchEvents SDK error

local BranchEventsError = {}
BranchEventsError.__index = BranchEventsError


function BranchEventsError.new(code, msg, ctx)
  local self = setmetatable({}, BranchEventsError)
  self.is_sdk_error = true
  self.sdk = "BranchEvents"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function BranchEventsError:error()
  return self.msg
end


function BranchEventsError:__tostring()
  return self.msg
end


return BranchEventsError
