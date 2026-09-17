package core

type BranchEventsError struct {
	IsBranchEventsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewBranchEventsError(code string, msg string, ctx *Context) *BranchEventsError {
	return &BranchEventsError{
		IsBranchEventsError: true,
		Sdk:              "BranchEvents",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *BranchEventsError) Error() string {
	return e.Msg
}
