          if (!codeInterpreterInvoked) return;

          sendMessage({
            id: codeInterpreterId,
            role: "assistant",
            content: [{ type: "text", text: { value: codeInterpreterInput } }],
          });
        });

      let runResult = await forwardStream(runStream);

      while (
        runResult?.status === "requires_action" &&
        runResult.required_action?.type === "submit_tool_outputs"
      ) {
        const tool_outputs =
          runResult.required_action.submit_tool_outputs.tool_calls.map(
            (toolCall: any) => {
              const parameters = JSON.parse(toolCall.function.arguments);

              switch (toolCall.function.name) {
                case "get_weather":
                  const data = getWeather(parameters.location);

                  sendDataMessage({
                    id: toolCall.id,
                    role: "data",
                    data: data,
                  });

                  return {
                    tool_call_id: toolCall.id,
                    output: JSON.stringify(data),
                  };

                default:
                  throw new Error(
                    `Unknown tool call function: ${toolCall.function.name}`
                  );
              }
            }
          );

        runResult = await forwardStream(
          openai.beta.threads.runs.submitToolOutputsStream(
            threadId,
            runResult.id,
            { tool_outputs }
          )
        );
