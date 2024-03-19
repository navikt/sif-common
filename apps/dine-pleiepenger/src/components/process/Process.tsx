import React, { forwardRef } from 'react';
import cl from 'clsx';
import Step, { ProcessStepProps } from './ProcessStep';

export interface ProcessProps extends React.HTMLAttributes<HTMLOListElement> {
    /**
     * <Process.Step /> elements
     */
    children: React.ReactNode;
    useIndex?: boolean;
}

interface ProcessComponent
    extends React.ForwardRefExoticComponent<ProcessProps & React.RefAttributes<HTMLOListElement>> {
    /**
     * @see 🏷️ {@link ProcessStepProps}
     * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
     */
    Step: typeof Step;
}

export const Process: ProcessComponent = forwardRef<HTMLOListElement, ProcessProps>(
    ({ children, className, useIndex, ...rest }, ref) => {
        return (
            <ol {...rest} ref={ref} className={cl('process', className)}>
                <>
                    {React.Children.map(children, (step, index) => {
                        const stepIndex = index + 1;
                        const isCurrent = React.isValidElement<ProcessStepProps>(step) ? step.props.current : undefined;
                        const isCompleted = React.isValidElement<ProcessStepProps>(step)
                            ? step.props.completed
                            : undefined;
                        const headingId = React.isValidElement<ProcessStepProps>(step)
                            ? step.props.headingId
                            : undefined;
                        const isContinuation = React.isValidElement<ProcessStepProps>(step)
                            ? step.props.isContinuation
                            : undefined;
                        return (
                            <li
                                aria-checked={isCompleted}
                                aria-labelledby={headingId}
                                className={cl(
                                    'process__item',
                                    isCurrent ? 'process__item__variant process__item__variant--CURRENT' : undefined,
                                    isContinuation ? 'process__item--CONTINUATION' : undefined,
                                )}
                                key={stepIndex + (children?.toString?.() ?? '')}>
                                <span className={cl('process__line process__line--1')} />
                                {React.isValidElement<ProcessStepProps>(step)
                                    ? React.cloneElement(step, {
                                          ...step.props,
                                          index: useIndex ? stepIndex : undefined,
                                      })
                                    : step}
                                <span className="process__line process__line--2" />
                            </li>
                        );
                    })}
                </>
            </ol>
        );
    },
) as ProcessComponent;

Process.Step = Step;
Process.displayName = 'Process';

export default Process;
