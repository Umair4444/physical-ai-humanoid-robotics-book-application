from typing import Dict, List, Callable, Any
from pydantic import BaseModel, Field
import inspect


class ToolDefinition(BaseModel):
    """
    Model representing a tool that can be used by the AI agent.
    """
    name: str = Field(..., description="Unique identifier for the tool")
    description: str = Field(..., description="Purpose and usage of the tool")
    parameters: Dict[str, Any] = Field(..., description="Schema for the tool's input parameters")
    function: Callable = Field(..., description="The actual function to execute", exclude=True)


class ToolRegistry:
    """
    Registry for managing tools available to the AI agent.
    """
    
    def __init__(self):
        self._tools: Dict[str, ToolDefinition] = {}
    
    def register_tool(self, name: str, description: str, func: Callable) -> None:
        """
        Register a new tool with the registry.
        
        Args:
            name: Unique name for the tool
            description: Description of what the tool does
            func: The function to execute when the tool is called
        """
        # Extract parameter information from the function
        sig = inspect.signature(func)
        parameters = {
            "type": "object",
            "properties": {},
            "required": []
        }
        
        for param_name, param in sig.parameters.items():
            # For simplicity, we'll just add basic type info
            # In a real implementation, we'd extract more detailed type information
            param_info = {"type": "string"}  # Default to string type
            if param.annotation != inspect.Parameter.empty:
                # Convert Python type annotations to JSON Schema types
                if param.annotation == int:
                    param_info["type"] = "integer"
                elif param.annotation == float:
                    param_info["type"] = "number"
                elif param.annotation == bool:
                    param_info["type"] = "boolean"
                elif param.annotation == list:
                    param_info["type"] = "array"
                elif param.annotation == dict:
                    param_info["type"] = "object"
            
            parameters["properties"][param_name] = param_info
            
            # If the parameter doesn't have a default value, it's required
            if param.default == inspect.Parameter.empty:
                parameters["required"].append(param_name)
        
        tool_def = ToolDefinition(
            name=name,
            description=description,
            parameters=parameters,
            function=func
        )
        
        self._tools[name] = tool_def
    
    def get_tool(self, name: str) -> ToolDefinition:
        """
        Get a tool by its name.
        
        Args:
            name: Name of the tool to retrieve
            
        Returns:
            ToolDefinition for the requested tool
        """
        if name not in self._tools:
            raise KeyError(f"Tool '{name}' not found in registry")
        return self._tools[name]
    
    def get_all_tools(self) -> List[ToolDefinition]:
        """
        Get all registered tools.
        
        Returns:
            List of all ToolDefinition objects
        """
        return list(self._tools.values())
    
    def execute_tool(self, name: str, **kwargs) -> Any:
        """
        Execute a registered tool with the provided arguments.
        
        Args:
            name: Name of the tool to execute
            **kwargs: Arguments to pass to the tool function
            
        Returns:
            Result of the tool execution
        """
        tool_def = self.get_tool(name)
        return tool_def.function(**kwargs)


# Create a global instance of the tool registry
tool_registry = ToolRegistry()


# Example tool implementations (these would be expanded in a real implementation)
def textbook_search_tool(query: str) -> str:
    """
    Search the textbook for relevant content based on the query.
    
    Args:
        query: Search query to look for in the textbook
        
    Returns:
        Relevant content from the textbook
    """
    # This is a placeholder implementation
    # In a real implementation, this would search the actual textbook content
    return f"Search results for '{query}': This is where textbook search results would appear."


def calculate_kinematics_tool(joint_angles: str) -> str:
    """
    Calculate kinematics based on joint angles.
    
    Args:
        joint_angles: String representation of joint angles
        
    Returns:
        Calculated kinematics results
    """
    # This is a placeholder implementation
    # In a real implementation, this would perform actual kinematics calculations
    return f"Kinematics calculation for joint angles '{joint_angles}': This is where kinematics calculations would appear."


def explain_concept_tool(concept: str) -> str:
    """
    Explain a robotics concept in simple terms.
    
    Args:
        concept: The concept to explain
        
    Returns:
        Explanation of the concept
    """
    # This is a placeholder implementation
    # In a real implementation, this would provide actual explanations
    return f"Explanation of '{concept}': This is where a detailed explanation would appear."


# Register the example tools
tool_registry.register_tool(
    name="textbook_search",
    description="Search the textbook for relevant content based on the query",
    func=textbook_search_tool
)

tool_registry.register_tool(
    name="calculate_kinematics",
    description="Calculate kinematics based on joint angles",
    func=calculate_kinematics_tool
)

tool_registry.register_tool(
    name="explain_concept",
    description="Explain a robotics concept in simple terms",
    func=explain_concept_tool
)